import { NextResponse } from "next/server"

// Opção 1: Usando Vercel KV (Redis)
// import { kv } from '@vercel/kv'

// export async function POST() {
//   try {
//     const views = await kv.incr('portfolio:views')
//     return NextResponse.json({ views })
//   } catch (error) {
//     console.error('Error incrementing views:', error)
//     return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
//   }
// }

// Opção 2: Usando Supabase
// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )

// export async function POST() {
//   try {
//     // Primeiro, tenta buscar o registro existente
//     const { data: existing, error: fetchError } = await supabase
//       .from('site_stats')
//       .select('views')
//       .eq('id', 'portfolio')
//       .single()

//     if (fetchError && fetchError.code !== 'PGRST116') {
//       throw fetchError
//     }

//     let newViews = 1
//     if (existing) {
//       newViews = existing.views + 1
//       // Atualiza o registro existente
//       const { error: updateError } = await supabase
//         .from('site_stats')
//         .update({ views: newViews, updated_at: new Date().toISOString() })
//         .eq('id', 'portfolio')

//       if (updateError) throw updateError
//     } else {
//       // Cria um novo registro
//       const { error: insertError } = await supabase
//         .from('site_stats')
//         .insert({ id: 'portfolio', views: newViews })

//       if (insertError) throw insertError
//     }

//     return NextResponse.json({ views: newViews })
//   } catch (error) {
//     console.error('Error incrementing views:', error)
//     return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
//   }
// }

// Opção 3: Usando um serviço externo simples (CountAPI)
export async function POST() {
  try {
    const response = await fetch("https://api.countapi.xyz/hit/cecilia-portfolio/views")
    const data = await response.json()

    return NextResponse.json({ views: data.value })
  } catch (error) {
    console.error("Error incrementing views:", error)
    return NextResponse.json({ error: "Failed to increment views" }, { status: 500 })
  }
}
