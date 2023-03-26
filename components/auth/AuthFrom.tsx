import { Button, Input, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

interface AuthFromProps {
  mode: "login" | "signup";
}

const AuthFrom = ({ mode }: AuthFromProps) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = formState.email.trim();
    const password = formState.password.trim();
    const firstName = formState.firstName.trim();
    const lastName = formState.lastName.trim();

    if (!email || !password) {
      console.log("Missing form fields");
      return;
    }

    if (mode === "signup") {
      if (!firstName || !lastName) {
        console.log("Missing form fields");
        return;
      }
      const newUser = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!newUser.ok) {
        const error = await newUser.json();
        console.log(error);
        return;
      }
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}`,
    });

    result?.error ? console.log(result.error) : router.push("/landingpage");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={formState.email}
          onChange={(e) => handleChange(e)}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={formState.password}
          onChange={(e) => handleChange(e)}
        />
        {mode === "signup" && (
          <>
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formState.firstName}
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formState.lastName}
              onChange={(e) => handleChange(e)}
            />
          </>
        )}
        {mode === "login" && (
          <Typography
            align="center"
            fontSize={14}
            variant={"caption"}
            sx={{ cursor: "pointer" }}
          >{`Don't remember your password?`}</Typography>
        )}
        <Button fullWidth type="submit" variant="contained" color="error">
          {mode === "login" ? "Log In" : "Request Access"}
        </Button>
      </Stack>
    </form>
  );
};

export default AuthFrom;
