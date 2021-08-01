import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import Validator from "validatorjs";

const validationRules = {
  email: 'required|email|confirmed',
  password: 'required|min:8|confirmed'
}

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    const { email, email_confirmation, password, password_confirmation } = JSON.parse(req.body)

    const validation = new Validator({
      email,
      email_confirmation,
      password,
      password_confirmation,
    }, validationRules)

  if (validation.fails()) {
    const errorArray: Array<string> = Array()
    const errors = validation.errors.all()

    if (errors.email) {
      errorArray.push(...errors.email)
    }

    if (errors.password) {
      errorArray.push(...errors.password)
    }

    return res.status(422).json({errors: errorArray})
  }

    let { user, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json({ user: user })
}
