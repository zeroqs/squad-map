import { Separator } from '@/shared/ui/separator'
import { CreateLayer } from '@/widgets/dashboard/CreateLayer'

export const Content = () => {
  return (
    <div>
      <h4 className="animate-fade animate-delay-300 scroll-m-20 text-xl font-semibold tracking-tight pb-4">
        Your layers
      </h4>
      <Separator className="animate-fade animate-delay-300" />
      <div className="animate-fade animate-delay-300 grid grid-cols-layouts gap-4 mt-10">
        <CreateLayer />
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  )
}
