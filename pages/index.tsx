import SmallContainer from "@/layouts/SmallContainer";
import Logo from "@/components/layout/Logo";
import Input, { InputTypes } from "@/components/forms/Input";
import { ChangeEvent, useState } from "react";
import Btn from "@/components/forms/Btn";
import Link from 'next/link'
import ErrorAlert from "@/components/ErrorAlert";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [validationError, setValidationError] = useState<null | Array<string>>(null)

  const signInBtnClicked = async () => {
    setError(null)
    setValidationError(null)

    const res = await fetch(`/api/login`, {
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const json = await res.json();

    if (res.status === 422) {
      setValidationError(json.errors)
    }

    if (res.status === 400) {
      setError(json.error)
    }

    if (json.user) await router.push(`/dashboard`);
  }

  return (
    <SmallContainer hasBoarder={true}>
      <Head>
        <title>Login | todoo.xyz</title>
      </Head>
      <div className={"text-center mb-10"}>
        <Logo />
      </div>
      {error &&
      <div className={'w-full'}>
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
      <div className="w-full">
        <Input
          placeholder={"Email"}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          isRequired={true}
        />
      </div>
      <div className="w-full">
        <Input
          placeholder={"Password"}
          type={InputTypes.password}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          isRequired={true}
        />
      </div>
      <div className="w-full">
        <div className="w-6/12 inline-block">
          <Btn onClick={signInBtnClicked}>Sign in</Btn>
        </div>
        <div className={"w-6/12 inline-block text-right"}>
          <Link href={"/register"}>
            <a>
              <Btn onClick={() => {
              }}>Register</Btn>
            </a>
          </Link>
        </div>
      </div>
    </SmallContainer>
  )
}
