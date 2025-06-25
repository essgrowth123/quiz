"use server"

export async function submitContactForm(formData: FormData) {
  // This is a server action that can be called from client components
  const name = formData.get("name")
  const email = formData.get("email")
  const business = formData.get("business")

  // Here you would typically save to a database or send an email
  console.log("Form submission:", { name, email, business })

  // For now, we'll just return success
  return { success: true }
}
