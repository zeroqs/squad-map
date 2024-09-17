'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { z } from 'zod'

import { useToast } from '@/hooks/use-toast'
import { useFetch } from '@/shared/hooks/useFetch'
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

const FormSchema = z.object({
  title: z.string().min(1, { message: 'Please specify title.' }),

  selectedMap: z.string().min(1, { message: 'Please select layer.' }),
})

export const CreateLayer = () => {
  const [selectedMap, setSelectedMap] = useState<AvailableMap | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      selectedMap: '',
    },
  })
  const availableMaps = useFetch<AvailableMap[] | null>({
    input: '/dashboard/api',
    initialValue: null,
  })

  const createMap = useFetch<AvailableMap | null>({
    input: '/dashboard/api',
    initialValue: null,
    config: {
      body: JSON.stringify({
        ...selectedMap,
        title: form.getValues('title'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  })

  const handlerOnSubmit = async () => {
    const dataResponse = await createMap.handleFetch()

    if (!dataResponse) {
      toast({
        title: 'Error',
        description: 'Failed to create layer.',
        variant: 'destructive',
      })
      return
    }

    router.push(`/layer/${dataResponse.id}`)
  }

  const handlerFetchOnModalOpen = async () => {
    setModalOpen((prev) => !prev)
    if (!modalOpen) {
      availableMaps.handleFetch()
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={handlerFetchOnModalOpen}>
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

          <form onSubmit={form.handleSubmit(handlerOnSubmit)}>
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
                        availableMaps.data!.filter(
                          (map) => map.id === value,
                        )[0],
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
                      {availableMaps.isLoading && (
                        <div className="text-center items-center justify-center flex h-52">
                          Loading...
                        </div>
                      )}

                      {availableMaps.error && (
                        <div className="text-center items-center justify-center flex h-52">
                          {availableMaps.error}
                        </div>
                      )}

                      {availableMaps.data?.length === 0 && (
                        <div className="text-center items-center justify-center flex h-52">
                          No data
                        </div>
                      )}

                      {availableMaps.data?.map((map) => (
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
              <Button loading={createMap.isLoading} className="w-full mt-4">
                Go to creating strategy
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
