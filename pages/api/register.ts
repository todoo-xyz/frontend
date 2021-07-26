import type {NextApiRequest, NextApiResponse} from 'next'
import Validator from "validatorjs";
import {supabase} from "../../utils/supabaseClient";

type RequestBody = {
  email: string,
  email_confirmation: string
  password: string,
  password_confirmation: string,
}

const validationRuleRegister = {
  email: 'required|email|confirmed',
  password: 'required|min:6|confirmed'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const reqData: RequestBody = JSON.parse(req.body)

    const validation = new Validator(
      {
        email: reqData.email,
        email_confirmation: reqData.email_confirmation,
        password: reqData.password,
        password_confirmation: reqData.password_confirmation
      },
      validationRuleRegister)

    if (validation.fails()) {
      const validatorErrors = validation.errors.all()
      const errors: Array<string> = []

      if (validatorErrors.email) {
        validatorErrors.email.forEach(item => errors.push(item))
      }
      if (validatorErrors.password) {
        validatorErrors.password.forEach(item => errors.push(item))
      }

      return res.status(422).json({
        errors
      })
    }

    const {error} = await supabase.auth.signUp({
      email: reqData.email,
      password: reqData.password
    })

    if (error) {
      return res.status(400).json({
        error
      })
    }

  return res.status(200).send('')

  }
  
  return res.status(404).send('')
}
