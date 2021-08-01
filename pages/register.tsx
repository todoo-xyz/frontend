import Logo from "@/components/layout/Logo";
import Input, { InputTypes } from "@/components/forms/Input";
import { ChangeEvent, useState } from "react";
import Btn from "@/components/forms/Btn";
import Link from 'next/link'
import ErrorAlert from "@/components/ErrorAlert";
import MediumContainer from "@/layouts/MediumContainer";
import SuccessAlert from "@/components/SuccessAlert";

export default function Home() {
  const [email, setEmail] = useState('')
  const [emailConfirmation, setEmailConfirmation] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<null|string>(null)
  const [validationError, setValidationError] = useState<null|Array<string>>(null)
  const [successMessage, setSuccessMessage] = useState<null|string>(null)

  const registerBtnClicked = async () => {
    setError('')
    setValidationError(null)
    setSuccessMessage('')

    const res = await fetch('/api/register', {
      body: JSON.stringify({
        email: email,
        email_confirmation: emailConfirmation,
        password: password,
        password_confirmation: passwordConfirmation
      }),
      headers: {
        'Context-Type': 'application/json',
      },
      method: "POST",
    })

    const result = await res.json()

    if (res.status === 200) {
      setSuccessMessage(`We have sent you an email. Please confirm it.`)
    }

    if (res.status === 401) {
      setError(result.error)
    }

    if (res.status === 422) {
      setValidationError(result.errors)
    }
  }

  return (
    <MediumContainer hasBoarder={true}>
      <div className={"text-center mb-10"}>
        <Logo />
      </div>
      {error &&
      <div className={"w-full"}>
        <ErrorAlert>
          <p>{error}</p>
        </ErrorAlert>
      </div>
      }
      {validationError &&
      <ErrorAlert>
        <ul className={"list-disc list-inside"}>
          {validationError.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </ErrorAlert>
      }
      {successMessage &&
      <div className={"w-full"}>
        <SuccessAlert>
          <p>{successMessage}</p>
        </SuccessAlert>
      </div>
      }
      <form
        className={"grid grid-cols1 lg:grid-cols-2 gap-x-4"}
      >
        <Input
          placeholder={"Email"}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          isRequired={true}
        />
        <Input
          placeholder={"Email Confirmation"}
          value={emailConfirmation}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailConfirmation(e.target.value)}
          isRequired={true}
        />
        <Input
          placeholder={"Password"}
          type={InputTypes.password}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          isRequired={true}
        />
        <Input
          placeholder={"Password Confirmation"}
          type={InputTypes.password}
          value={passwordConfirmation}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
          isRequired={true}
        />
      </form>
      <div className={"grid grid-cols-2 gap-4"}>
        <div className={"text-right"}>
          <Btn onClick={registerBtnClicked}>Register</Btn>
        </div>
        <div>
          <Link href={"/"}>
            <a>
              <Btn onClick={() => {
              }}>Go to login</Btn>
            </a>
          </Link>
        </div>
      </div>
    </MediumContainer>
  )
}
