import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

const emailAfterRegister = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const { email, name, token } = newUserData

    // Enviar el email
    await transport.sendMail({
        from: 'bienesraices_230297.com',
        to: email,
        subject: 'Bienvenido/a a BienesRaices_230297',
        text: 'Ya casi puedes usar nuestra plataforma, solo falta...',
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; color: p_blue-200; background-color: #d1d5db; padding: 20px;">
                    <h1 style="color: #0D1B2A; font-size: 24px; text-align: center;">Bienvenido/a a BienesRaices_230297</h1>
                    <p style="font-size: 18px; line-height: 1.6;">
                        Hola, <span style="color: #0D1B2A;">${name}</span>,<br><br>
                        Te damos la bienvenida a nuestra plataforma BienesRaíces, el sitio seguro donde podrás buscar, comprar y ofertar propiedades a través de internet.
                    </p>
                    <p style="font-size: 18px; line-height: 1.6;">
                        Para que puedas empezar a disfrutar de nuestros servicios, solo necesitas confirmar tu cuenta. Haz clic en el siguiente enlace para completar tu registro:
                    </p>
                    <p style="font-size: 18px; text-align: center;">
                        <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}" style="text-decoration: none; background-color: #E7E247; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Confirmar cuenta</a>
                    </p>
                    <p style="font-size: 18px; line-height: 1.6;">
                        Si no creaste esta cuenta, por favor ignora este mensaje.
                    </p>
                    <br>
                    <p style="font-size: 18px; text-align: center;">
                        Atentamente,<br><span style="color: p_blue;">Esther González Peralta</span>
                    </p>
                    <br>
                    <footer style="text-align: center; margin-top: 10px;">
                        <img src="https://lh3.googleusercontent.com/pw/AP1GczM18su__nIAknaYunrMA3ZJcjfYtzahNMk3evTfhHUagX7CZRIeSvhd6WdcJOKKwVrDJLh2uPp8G-JSGNHSoY7cB4kTkyBxmzzr1ji5_3xO_97OUss5055mR8D7KcifTgZc4yf3E7w5k2tWVblr32dd=w357-h101-s-no-gm?authuser=0" alt="Firma" style="width: 150px ;"/>
                    </footer>
                </body>
            </html>
        `
    })
}

export { emailAfterRegister }
