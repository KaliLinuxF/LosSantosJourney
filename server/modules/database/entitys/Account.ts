import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index('idx_account_id', ['id'])
@Index('idx_account_login', ['login'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  lastLoginIp: string;

  @Column()
  registrationIp: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  @Column()
  email: string;

  @Column()
  promoCode: string;

  @Column({ default: 0 })
  donat: number;

  @Column()
  socialClub: string;

  @Column()
  serial: string;
}