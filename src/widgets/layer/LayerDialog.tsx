import { FormEvent } from 'react'

import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

interface LayerDialogProps {
  modalOpened: boolean
  setModalOpen: (value: boolean) => void
  newLayerTitle: string
  setNewLayerTitle: (value: string) => void
  handleAddLayer: (event: FormEvent<HTMLFormElement>) => void
}

export const LayerDialog = ({
  modalOpened,
  setModalOpen,
  newLayerTitle,
  setNewLayerTitle,
  handleAddLayer,
}: LayerDialogProps) => {
  return (
    <Dialog open={modalOpened} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddLayer} className="contents">
          <DialogHeader>
            <DialogTitle>Add New Layer</DialogTitle>
            <DialogDescription>
              Type layer title here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-col items-start gap-2 ">
              <Label htmlFor="layer">Layer</Label>
              <Input
                value={newLayerTitle}
                onChange={(e) => setNewLayerTitle(e.target.value)}
                id="layer"
                placeholder="Layer 2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
