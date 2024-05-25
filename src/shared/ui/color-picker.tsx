/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

const solids = [
  '#E2E2E2',
  '#ff75c3',
  '#ffa647',
  '#ffe83f',
  '#9fff5b',
  '#70e2ff',
  '#cd93ff',
  '#09203f',
  '#ff5733',
  '#c70039',
  '#900c3f',
  '#581845',
  '#1abc9c',
  '#16a085',
  '#f39c12',
  '#d35400',
  '#27ae60',
  '#2ecc71',
  '#3498db',
  '#2980b9',
  '#8e44ad',
  '#9b59b6',
  '#e74c3c',
  '#c0392b',
  '#ecf0f1',
  '#bdc3c7',
  '#95a5a6',
  '#7f8c8d',
]

interface GradientPickerProps {
  background: string
  setBackground: (background: string) => void
  className?: string
}

export function GradientPicker({
  background,
  setBackground,
}: GradientPickerProps) {
  const [tab, setTab] = useState('solid')

  const onChangeTab = (value: string) => {
    setTab(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-start text-left font-normal"
        >
          <div className="w-full flex items-center gap-2">
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
              style={{ background }}
            />

            <div className="truncate flex-1">{background}</div>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64">
        <Tabs onValueChange={onChangeTab} defaultValue={tab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="picker">
              Picker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="picker" className="flex flex-wrap gap-1 mt-0">
            <HexColorPicker color={background} onChange={setBackground} />
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        {tab === 'solid' && (
          <Input
            className="w-full mt-4"
            placeholder="Background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
