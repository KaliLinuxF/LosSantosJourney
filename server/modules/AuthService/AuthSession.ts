import { AuthStatus } from "./AuthStatus";
import { authConfig } from "./config";
import { AuthSessionHandler } from "./AuthSessionHandler";
import { AuthValidationRegExps } from '../../../shared/auth/validationRegExps';
import { ValidateField } from "./ValidateField";
import { Account } from "../database/Models/Account";
import { comparePasswords, hashPassword } from "./utils";
import { AccountHandler } from "../Account/AccountHandler";
import rpc from '../../../shared/rpc';
import NotifyApi from '../../../shared/notifications/api';
import { NotificationPositions, NotificationTypes } from "../../../shared/notifications/types";

export class AuthSession {
    private status: AuthStatus;
    public readonly player: PlayerMp;
    private sessionTimeout: NodeJS.Timeout | null = null;
    private readonly sessionTimeoutTime: number;
    private flood: number;

    constructor(player: PlayerMp) {
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

    private finishSession() {
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
                this.player.call('auth:success');
                break;
            }
        }

        AuthSessionHandler.remove(this);
    }

    private showNotifyError(message: string) {
        rpc.callBrowsers(this.player, 'executeRpc', NotifyApi.show({ 
            position: NotificationPositions.TopLeft,
            duration: 4,
            text: message,
            type: NotificationTypes.Error
        }));
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

        const account = await Account.findOne({ where: { login }});

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

        AccountHandler.create(account.id, this.player, {
            login: account.login,
            password: account.password,
            lastLoginIp: this.player.ip,
            registrationData: account.registrationDate,
            registrationIp: account.registrationIp,
            email: account.email,
            promoCode: account.promoCode,
            donat: account.donat,
            socialClub: account.socialClub,
            serial: account.serial
        });
 
        this.status = AuthStatus.Success;
        this.finishSession();
    }

    async onPlayerTryRegister(login: string, password: string, repass: string, email: string, promo: string) {
        if(!this.validateField(login, ValidateField.Login) 
        || !this.validateField(password, ValidateField.Password)
        || !this.validateField(email, ValidateField.Email)
        || !this.validateField(repass, ValidateField.Password)) {
            this.badAuth();
            return;
        }

        if(promo.length < 1) {
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

        const account = await Account.findOne({ where: { login, email }});

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

        const newAccount = await Account.create({
            login,
            password: hashedPassword,
            lastLoginIp: this.player.ip,
            registrationIp: this.player.ip,
            email,
            promoCode: promo,
            socialClub: this.player.socialClub,
            serial: this.player.serial
        });

        AccountHandler.create(newAccount.id, this.player, {
            login: newAccount.login,
            password: newAccount.password,
            lastLoginIp: newAccount.lastLoginIp,
            registrationData: newAccount.registrationDate,
            registrationIp: newAccount.registrationIp,
            email: newAccount.email,
            promoCode: newAccount.promoCode,
            donat: newAccount.donat,
            socialClub: newAccount.socialClub,
            serial: newAccount.serial
        });

        this.status = AuthStatus.Success;
        this.finishSession();
    }
}