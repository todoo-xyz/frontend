import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import Validator from "validatorjs";

const validationRules = {
  email: 'required|email',
  password: 'required|min:8'
}

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  const validation = new Validator({email, password}, validationRules)

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


  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  })

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ user: user })
}
