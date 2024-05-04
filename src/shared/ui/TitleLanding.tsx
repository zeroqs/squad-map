'use client'

import TypeIt from 'typeit-react'

export const TitleLanding = () => {
  return (
    <TypeIt
      options={{
        speed: 120,
        loop: true,
        cursor: {
          animation: {
            options: {
              iterations: Infinity,
              easing: 'linear',
              fill: 'forwards',
            },
          },
        },
      }}
      getBeforeInit={(instance) => {
        instance
          .type('Flexible')
          .pause(750)
          .delete('Flexible')
          .type(' Powerful')
          .pause(750)
          .delete('Powerful')
          .type('Intuitive')
          .pause(750)
          .delete('Intuitive')
        // Remember to return it!
        return instance
      }}
    />
  )
}
