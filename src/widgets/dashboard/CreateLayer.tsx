'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BsFileEarmarkPlus } from 'react-icons/bs'

import BlackCoastImage from '@/../public/BlackCoast.webp'
import FoolsRoadImage from '@/../public/FoolsRoad.webp'
import NarvaImage from '@/../public/Narva.webp'
import YehorivkaImage from '@/../public/Yehorivka.webp'
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
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

export const CreateLayer = () => {
  const [state, setState] = useState('')

  const loadSelectedImage = () => {
    switch (state) {
      case 'Narva':
        return NarvaImage
      case 'FoolsRoad':
        return FoolsRoadImage
      case 'Yehorivka':
        return YehorivkaImage
      case 'BlackCoast':
        return BlackCoastImage
      default:
        return ''
    }
  }

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

        <div className="grid w-full items-center gap-1.5 mt-2 mb-2">
          <Label htmlFor="tactic">Tactic title</Label>
          <Input type="text" id="tactic" placeholder="Tactic title" />
        </div>

        <Select onValueChange={(value) => setState(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select layer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Narva">Narva</SelectItem>
            <SelectItem value="FoolsRoad">Fools road</SelectItem>
            <SelectItem value="Yehorivka">Yehorivka</SelectItem>
            <SelectItem value="BlackCoast">BlackCoast</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative overflow-hidden min-h-[350px] flex justify-center items-center  rounded-lg border border-primary/20 h-60">
          {state.length > 0 ? (
            <Image
              className="animate-fade"
              src={loadSelectedImage()}
              alt="Map picture"
            />
          ) : (
            <span className="text-sm text-muted-foreground">Preview</span>
          )}
        </div>

        <DialogFooter>
          <Button className="w-full mt-4">Go to creating strategy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
