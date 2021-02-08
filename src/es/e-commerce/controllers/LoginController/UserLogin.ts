import { DBDataLogin } from '../../DB crud/DBDataLogin';
import { ErrorCatch } from '../ErrorCatch'
import { LoginAbstract } from './LoginAbstract'

export class UserLogin extends LoginAbstract{
    constructor() {
        super(new DBDataLogin())
    }

    async Login(param,req,res,msg) {

        try {

            const user = await this.login.find(param,req,res,{ email: req.body.email })
            
            if (!user[0]) {
                return res.status(404).send('email is not found');
            }

            const validpass = await this.login.validation(req.body.password, user[0].password)

            if (!validpass) {
                return res.status(401).send('Invalid Password!');
            }
            
            const token = this.login.token(user[0].id)      
            return res.header('auth-token', token).send({message:msg})

        } catch (error) {
            return ErrorCatch.errorReturn(error, res, 'There was a problem whit the logging')
        }
    }

}