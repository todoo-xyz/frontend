import type {NextApiRequest, NextApiResponse} from 'next'
import Validator from "validatorjs";
import type {ApiLoginResponse} from "@/typings/ApiLoginResponse";
import {supabase} from "../../utils/supabaseClient";

type RequestBody = {
  email: string,
  password: string,
}

const validationRuleLogin = {
  email: 'required|email',
  password: 'required|min:6'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiLoginResponse>) {
  if (req.method === 'POST') {
    const reqData: RequestBody = JSON.parse(req.body)

    const validation = new Validator(
      {
        email: reqData.email,
        password: reqData.password,
      },
      validationRuleLogin)

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

    const {error} = await supabase.auth.signIn({
      email: reqData.email,
      password: reqData.password
    })

    if (error) {
      return res.status(400).json({
        error
      })
    }

    

  }

  return res.status(404)
}
