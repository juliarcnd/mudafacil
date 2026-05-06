import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: "MudaFácil <noreply@mudafacil.com.br>",
    to: email,
    subject: "Bem-vindo ao MudaFácil! 🚛",
    html: `
      <h1>Olá, ${name}!</h1>
      <p>Seu trial de 14 dias começou. Aproveite todos os recursos ilimitados do MudaFácil.</p>
      <p>Monte seu canvas de mudança, compare caminhões e receba cotações instantâneas.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/app">Começar agora →</a>
    `,
  })
}
