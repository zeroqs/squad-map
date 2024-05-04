import { BsFileEarmarkPlus } from 'react-icons/bs'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

export const CreateLayer = () => {
  return (
    <Dialog>
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
        <DialogHeader>
          <DialogTitle>Create layer</DialogTitle>
          <DialogDescription>Create a new layer to start</DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select layer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Narva</SelectItem>
            <SelectItem value="dark">Fools road</SelectItem>
            <SelectItem value="system">Yehorivka</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button className="w-full mt-4">Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
