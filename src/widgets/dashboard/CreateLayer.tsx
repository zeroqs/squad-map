'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { z } from 'zod'

import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Please specify title.' }),

  selectedMap: z.string().min(1, { message: 'Please select layer.' }),
})

export const CreateLayer = () => {
  const [availableMaps, setAvailableMaps] = useState<AvailableMap[] | null>(
    null,
  )
  const [selectedMap, setSelectedMap] = useState<AvailableMap | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      selectedMap: '',
    },
  })

  const onSubmit = async () => {
    const res = await fetch(`${window.location.origin}/dashboard/api`, {
      body: JSON.stringify(selectedMap),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const data = await res.json()

    router.push(`/layer/${data.id}`)
  }

  const onClick = async () => {
    setModalOpen((prev) => !prev)
    if (!modalOpen) {
      setLoading(true)
      try {
        const data = await fetch(`${window.location.origin}/dashboard/api`)
        const posts = await data.json()
        setAvailableMaps(posts)
        setError(null)
      } catch (error) {
        setError((error as Error).message)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={onClick}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-base text-muted-foreground group-hover:text-primary">
            Create new layer
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Create layer</DialogTitle>
            <DialogDescription>Create a new layer to start</DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-1.5 mt-2 mb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tactic title</FormLabel>
                    <FormControl>
                      <Input placeholder="Tactic title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="selectedMap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layer</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedMap(
                        availableMaps!.filter((map) => map.id === value)[0],
                      )
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoading && (
                        <div className="text-center items-center justify-center flex h-52">
                          Loading...
                        </div>
                      )}

                      {error && (
                        <div className="text-center items-center justify-center flex h-52">
                          {error}
                        </div>
                      )}

                      {availableMaps?.map((map) => (
                        <SelectItem key={map.id} value={map.id}>
                          {map.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative overflow-hidden min-h-[350px] flex justify-center items-center  rounded-lg border border-primary/20 h-60 mt-6">
              {selectedMap ? (
                <Image
                  className="animate-fade"
                  src={selectedMap.previewMapUrl}
                  width={460}
                  height={350}
                  alt="Map picture"
                />
              ) : (
                <span className="text-sm text-muted-foreground">Preview</span>
              )}
            </div>

            <DialogFooter>
              <Button className="w-full mt-4">Go to creating strategy</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
