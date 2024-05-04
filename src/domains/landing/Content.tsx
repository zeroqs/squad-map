import { TitleLanding } from '@/shared/ui/TitleLanding'

export const Content = () => {
  return (
    <main>
      <div className="text-center flex flex-col justify-center items-center h-72 text-balance">
        <h1 className="animate-fade-down animate-delay-200 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl animate-fadeIn">
          Design Your Strategy : Fast and <TitleLanding />
        </h1>
      </div>
      {/* <Button>
        <span className="scroll-m-20 text-base font-semibold tracking-tight">
          Try
        </span>
      </Button> */}
    </main>
  )
}
