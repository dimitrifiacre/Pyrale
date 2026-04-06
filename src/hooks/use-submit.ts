"use client"

import { useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

export function useSubmit() {
  const [status, setStatus] = useState<Status>("idle")

  const submit = async (fn: () => Promise<void>) => {
    if (status === "loading") return
    setStatus("loading")
    try {
      await fn()
      setStatus("success")
    } catch (error) {
      setStatus("error")
      throw error
    }
  }

  const reset = () => setStatus("idle")

  return {
    submit,
    reset,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    status,
  }
}
