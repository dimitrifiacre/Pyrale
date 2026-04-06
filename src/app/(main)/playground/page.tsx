"use client";

import { useState } from "react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldLabel, FieldError, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus, EyeOffIcon, EyeIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export default function PlaygroundPage() {
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations()

  return (
    <div className="container mx-auto flex flex-col gap-12 md:gap-24 px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-16">
      <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">Playground</h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Button size="lg"><Plus /> Primary <Plus /></Button>
              <Button size="lg" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button size="md"><Plus /> Primary <Plus /></Button>
              <Button size="md" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button size="sm"><Plus /> Primary <Plus /></Button>
              <Button size="sm" isIcon={true}><Plus /></Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Button variant="secondary" size="lg"><Plus /> Secondary <Plus /></Button>
              <Button variant="secondary" size="lg" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" size="md"><Plus /> Secondary <Plus /></Button>
              <Button variant="secondary" size="md" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" size="sm"><Plus /> Secondary <Plus /></Button>
              <Button variant="secondary" size="sm" isIcon={true}><Plus /></Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Button variant="ghost" size="lg"><Plus /> Ghost <Plus /></Button>
              <Button variant="ghost" size="lg" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="md"><Plus /> Ghost <Plus /></Button>
              <Button variant="ghost" size="md" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm"><Plus /> Ghost <Plus /></Button>
              <Button variant="ghost" size="sm" isIcon={true}><Plus /></Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Button variant="destructive" size="lg"><Plus /> Destructive <Plus /></Button>
              <Button variant="destructive" size="lg" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button variant="destructive" size="md"><Plus /> Destructive <Plus /></Button>
              <Button variant="destructive" size="md" isIcon={true}><Plus /></Button>
            </div>
            <div className="flex gap-4">
              <Button variant="destructive" size="sm"><Plus /> Destructive <Plus /></Button>
              <Button variant="destructive" size="sm" isIcon={true}><Plus /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Inputs</h2>
        <div className="flex flex-wrap gap-4">
          <Field className="max-w-xs">
            <FieldLabel htmlFor="input-field">Label</FieldLabel>
            <Input id="input-field" type="text" placeholder="Placeholder" />
            <FieldDescription>
              This is helper text.
            </FieldDescription>
          </Field>
          <Field className="max-w-xs">
            <FieldLabel htmlFor="input-value">Label</FieldLabel>
            <Input id="input-value" type="text" defaultValue="Value" />
            <FieldDescription>
              This is helper text.
            </FieldDescription>
          </Field>
          <Field className="max-w-xs" data-disabled>
            <FieldLabel htmlFor="input-disabled">Label</FieldLabel>
            <Input id="input-disabled" type="text" defaultValue="Value" disabled />
            <FieldDescription>
              This is helper text.
            </FieldDescription>
          </Field>
          <Field className="max-w-xs" data-invalid>
            <FieldLabel htmlFor="input-error">Label</FieldLabel>
            <Input id="input-error" type="text" defaultValue="Value" aria-invalid />
            <FieldError>
              This is helper text.
            </FieldError>
          </Field>

          <Field className="max-w-xs">
            <Label htmlFor="input-password">Password</Label>
            <div className="relative">
              <Input id="input-password" type={isVisible ? "text" : "password"} />
              <Button className="absolute inset-y-0 right-0 hover:bg-transparent" variant="ghost" isIcon={true} onClick={() => setIsVisible(prevState => !prevState)} >{isVisible ? <EyeOffIcon /> : <EyeIcon />}</Button>
            </div>
            <FieldDescription>
              This is helper text.
            </FieldDescription>
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Selection controls</h2>
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-col gap-3">
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-1" name="terms-checkbox-1" defaultChecked/>
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-1">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-2" name="terms-checkbox-2"/>
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-2">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Checkbox id="terms-checkbox-3" name="terms-checkbox-3" disabled/>
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-3">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-invalid>
              <Checkbox id="terms-checkbox-4" name="terms-checkbox-4" aria-invalid/>
              <FieldContent>
                <FieldLabel htmlFor="terms-checkbox-4">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <FieldError>
              This is helper text.
            </FieldError>
          </div>
          <div className="flex flex-col gap-3">
            <RadioGroup defaultValue="option1">
              <Field orientation="horizontal">
                <RadioGroupItem value="option1" id="terms-radio-1" />
                <FieldContent>
                  <FieldLabel htmlFor="terms-radio-1">Label</FieldLabel>
                  <FieldDescription>Description</FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="option2" id="terms-radio-2" />
                <FieldContent>
                  <FieldLabel htmlFor="terms-radio-2">Label</FieldLabel>
                  <FieldDescription>Description</FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal" data-disabled>
                <RadioGroupItem value="option3" id="terms-radio-3" disabled />
                <FieldContent>
                  <FieldLabel htmlFor="terms-radio-3">Label</FieldLabel>
                  <FieldDescription>Description</FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal" data-invalid>
                <RadioGroupItem value="option4" id="terms-radio-4" aria-invalid />
                <FieldContent>
                  <FieldLabel htmlFor="terms-radio-4">Label</FieldLabel>
                  <FieldDescription>Description</FieldDescription>
                </FieldContent>
              </Field>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-3">
            <Field orientation="horizontal">
              <Switch id="terms-switch-1" />
              <FieldContent>
                <FieldLabel htmlFor="terms-switch-1">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal">
              <Switch id="terms-switch-2" defaultChecked />
              <FieldContent>
                <FieldLabel htmlFor="terms-switch-2">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Switch id="terms-switch-3" disabled />
              <FieldContent>
                <FieldLabel htmlFor="terms-switch-3">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Switch id="terms-switch-4" disabled checked />
              <FieldContent>
                <FieldLabel htmlFor="terms-switch-4">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-invalid>
              <Switch id="terms-switch-5" aria-invalid />
              <FieldContent>
                <FieldLabel htmlFor="terms-switch-5">Label</FieldLabel>
                <FieldDescription>Description</FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
          <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Avatar</h2>
          <div className="flex flex-wrap gap-4">
            <Avatar>
              <AvatarImage src="https://hyvatar.io/render/Woon?size=64" alt="" />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
          </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Badges</h2>
        <div className="flex flex-wrap gap-4">
            <Badge>Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="blue">Blue</Badge>
            <Badge variant="green">Green</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Tooltip</h2>
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">Tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tooltip</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-regular uppercase tracking-[0.2em] text-muted-foreground">Toast</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={() => toast.info("Text", {description: "Description" })}>Info</Button>
          <Button variant="secondary" onClick={() => toast.success("Text", {description: "Description" })}>Success</Button>
          <Button variant="secondary" onClick={() => toast.error("Text", {description: "Description" })}>Error</Button>
          <Button variant="secondary" onClick={() => toast.warning("Text", {description: "Description" })}>Warning</Button>
          <Button variant="secondary" onClick={() => {toast.promise<{ name: string }>(() => new Promise((resolve) => setTimeout(() => resolve({ name: "Event" }), 2000)),{loading: "Loading...",success: (data) => `${data.name} has been created`,error: "Error" })}}>Promise</Button>
        </div>
      </section>
    </div>
  );
}