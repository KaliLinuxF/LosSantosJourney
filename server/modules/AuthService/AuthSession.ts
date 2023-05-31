import { AuthStatus } from "./AuthStatus";
import { authConfig } from "./config";
import { AuthSessionHandler } from "./AuthSessionHandler";
import { AuthValidationRegExps } from '../../../shared/auth/validationRegExps';
import { ValidateField } from "./ValidateField";
import { Account as AccountModel } from "../database/Models/Account";
import { comparePasswords, hashPassword } from "./utils";
import { AccountHandler } from "../Account/AccountHandler";
import { Person as PersonModel } from "../database/Models/Person";
import { NotificationPositions, NotificationTypes } from "../../../shared/notifications/types";
import { showNotify } from "../utils/notify/notify";
import { CharacterEditorServiceHandler } from "../CharacterEditor/CharacterEditorServiceHandler";

export class AuthSession {
    readonly id: number;
    private status: AuthStatus;
    public readonly player: PlayerMp;
    private sessionTimeout: NodeJS.Timeout | null = null;
    private readonly sessionTimeoutTime: number;
    private flood: number;

    constructor(id: number, player: PlayerMp) {
        this.id = id;
        this.player = player;
        this.flood = 0;
        this.sessionTimeoutTime = authConfig.authTimeout * 60 * 1000;

        this.startSession();
    }

    private startSession() {
        this.player.accountInstance = null;
        this.player.call('auth:clientpreset');

        this.restartTimeout();
    }

    private async finishSession() {
        switch (this.status) {
            case AuthStatus.Timeout: {
                this.showNotifyError('Auth session time out');

                setTimeout(() => {
                    this.player.kick('bad login');
                    this.player.kick('bad login');
                }, 5000);
                break;
            }

            case AuthStatus.Flood: {
                this.showNotifyError('Too many login attempts, you were kicked')

                setTimeout(() => {
                    this.player.kick('bad login');
                    this.player.kick('bad login');
                }, 5000);
                break;
            }

            case AuthStatus.Success: {
                if(!this.player.accountInstance) {
                    return;
                }

                this.player.call('auth:success');

                const persons = await PersonModel.findAll({
                    where: {
                        accountId: this.player.accountInstance.id
                    }
                });
                
                if(persons.length < 1) {
                    CharacterEditorServiceHandler.create(this.player).init();
                } else {
                    // TODO: Show character selection
                }

                break;
            }
        }

        clearTimeout(this.sessionTimeout);
        AuthSessionHandler.remove(this.id);
    }

    private showNotifyError(message: string) {
        showNotify(this.player, NotificationTypes.Error, message, 4, NotificationPositions.TopLeft);
    }

    private badAuth() {
        this.flood += 1;
        this.status = AuthStatus.Flood;

        if (this.flood >= authConfig.maxFlood) {
            this.finishSession()
        } else {
            this.restartTimeout();
        }
    }

    private restartTimeout() {
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
            this.sessionTimeout = null;
        }

        this.sessionTimeout = setTimeout(() => {
            this.status = AuthStatus.Timeout;
            this.finishSession();
        }, this.sessionTimeoutTime);
    }

    private validateField(field: string, fieldType: ValidateField) {
        let result: boolean = true;

        switch (fieldType) {
            case ValidateField.Email: {
                if(!AuthValidationRegExps.mailRegExps.AllowedChars.test(field)) {
                    this.showNotifyError('Invalid mail, only English letters, numbers and special characters are available');
                    result = false;
                }
                break;
            }
            case ValidateField.Login: {
                if(!AuthValidationRegExps.usernameRegExps.AllowedChars.test(field)) {
                    this.showNotifyError('Invalid login, only English letters, numbers and special characters are avalible');
                    result = false;
                }

                if(!AuthValidationRegExps.usernameRegExps.Length.test(field)) {
                    this.showNotifyError('Invalid login, minimum 4 characters and maximum 25');
                    result = false;
                }
                break;
            }
            case ValidateField.Password: {
                if(!AuthValidationRegExps.passwordRegExps.AllowedChars.test(field)) {
                    this.showNotifyError('Invalid password, only English letters, numbers and special characters are avalible');
                    result = false;
                }

                if(!AuthValidationRegExps.passwordRegExps.Length.test(field)) {
                    this.showNotifyError('Invalid password, minimum 6 characters and maximum 18');
                    result = false;
                }
                break;
            }
            case ValidateField.Promo: {
                if(!AuthValidationRegExps.promocodeRegExps.AllowedChars.test(field)) {
                    this.showNotifyError('Invalid promo, only English letters, numbers and special characters are avalible');
                    result = false;
                }
                break;
            }

            default: {
                result = false;
                break;
            }
        }

        return result;
    }

    async onPlayerTryLogin(login: string, password: string) {
        if(!this.validateField(login, ValidateField.Login) || !this.validateField(password, ValidateField.Password)) {
            this.badAuth();
            this.restartTimeout();
            return;
        }

        let account: AccountModel | null = null;

        try {
            account = await AccountModel.findOne({
                where: {
                    login: login
                }
            });
        } catch (error) {
            console.log(error);
        }

        if(!account) {
            this.showNotifyError('Account not found');
            this.badAuth();
            return;
        }

        const passwordComapre = await comparePasswords(password, account.password);

        if(!passwordComapre) {
            this.showNotifyError('Bad password');
            this.badAuth();
            return;
        }

        const accountInstance = AccountHandler.get(account.id);

        if(accountInstance) {
            this.showNotifyError('User already exist');
            this.badAuth();
            return;
        }

        if(this.player.socialClub !== account.socialClub) {
            this.showNotifyError('SocialClub does not match');
            this.badAuth();
            return;
        }

        this.successAuth(account);
    }

    async onPlayerTryRegister(login: string, password: string, repass: string, email: string, promo: string) {
        if(!this.validateField(login, ValidateField.Login) 
        || !this.validateField(password, ValidateField.Password)
        || !this.validateField(email, ValidateField.Email)
        || !this.validateField(repass, ValidateField.Password)) {
            this.badAuth();
            return;
        }

        if(promo.length > 0) {
            if(!this.validateField(promo, ValidateField.Promo)) {
                this.badAuth();
                return;
            }
        }

        if(password !== repass) {
            this.showNotifyError('Passwords dont match')
            this.badAuth();
            return;
        }

        const account = await AccountModel.findOne({ where: { login, email }});

        if(account) {
            if(account.login === login) {
                this.showNotifyError('Account with this login already exsist');
                this.badAuth();
                return;
            }

            if(account.email === email) {
                this.showNotifyError('Account with this email already exsist');
                this.badAuth();
                return;
            }
        }

        const hashedPassword = await hashPassword(password);

        const newAccount = await AccountModel.create({
            login,
            password: hashedPassword,
            lastLoginIp: this.player.ip,
            registrationIp: this.player.ip,
            email,
            promoCode: promo,
            socialClub: this.player.socialClub,
            serial: this.player.serial
        });

        this.successAuth(newAccount);
    }

    successAuth(accountModelInstance: AccountModel) {
        const accountInstance = AccountHandler.create(accountModelInstance.id, this.player, {
            login: accountModelInstance.login,
            password: accountModelInstance.password,
            lastLoginIp: accountModelInstance.lastLoginIp,
            lastLoginData: accountModelInstance.lastLoginDate,
            registrationData: accountModelInstance.registrationDate,
            registrationIp: accountModelInstance.registrationIp,
            email: accountModelInstance.email,
            promoCode: accountModelInstance.promoCode,
            donat: accountModelInstance.donat,
            socialClub: accountModelInstance.socialClub,
            serial: accountModelInstance.serial
        });

        this.player.accountInstance = accountInstance;
        this.status = AuthStatus.Success;
        this.finishSession();
    }
}