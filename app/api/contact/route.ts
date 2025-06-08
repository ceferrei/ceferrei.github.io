import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Aqui você pode integrar com um serviço de email como:
    // - Resend
    // - SendGrid
    // - Nodemailer com SMTP
    // - EmailJS

    // Exemplo usando fetch para um webhook (como Formspree, Netlify Forms, etc.)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("message", message)
    formData.append("_replyto", email)
    formData.append("_subject", `Nova mensagem de ${name} - Portfolio`)

    // Substitua esta URL pela sua URL do Formspree ou outro serviço
    const response = await fetch("https://formspree.io/f/mldnjewp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })

    if (response.ok) {
      return NextResponse.json({ message: "Mensagem enviada com sucesso!" }, { status: 200 })
    } else {
      throw new Error("Erro no serviço de email")
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
