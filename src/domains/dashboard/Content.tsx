import { CreateLayer } from '@/domains/dashboard/CreateLayer'
import { Separator } from '@/shared/ui/separator'

export const Content = () => {
  return (
    <main className="max-w-7xl m-auto p-4">
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pb-4">
          Your layouts
        </h4>
        <Separator />
        <div className="grid grid-cols-layouts gap-4 mt-10">
          <CreateLayer />
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
    </main>
  )
}
