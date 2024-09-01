export const RallyIcon = ({ fill }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 128 128"
      version="1.1"
    >
      <path
        d="M 44.226 36.179 L 44.500 53.358 47.250 54.092 C 49.977 54.821, 50 54.785, 50 49.914 L 50 45 67.500 45 L 85 45 85 32 L 85 19 64.476 19 L 43.953 19 44.226 36.179 M 35.401 57.905 C 30.524 60.120, 27.099 64.569, 26.288 69.740 C 25.723 73.350, 25.775 73.436, 27.600 71.902 C 30.558 69.415, 32.543 69.035, 36.653 70.170 C 41.591 71.533, 47.487 77.488, 48.885 82.523 C 49.492 84.710, 49.991 91.338, 49.994 97.250 C 50.001 109.227, 49.923 109.126, 56.757 106.024 C 62.100 103.599, 63 101.309, 63 90.145 C 63 74.116, 58.235 62.400, 50.026 58.250 C 44.644 55.528, 40.833 55.439, 35.401 57.905 M 79.500 57.881 C 77.300 58.891, 74.734 60.581, 73.797 61.636 C 66.541 69.807, 62.795 94.983, 67.672 102.795 C 69.063 105.022, 71.473 106.328, 76.544 107.600 L 79 108.217 79 96.320 C 79 85.955, 79.290 83.857, 81.250 80.020 C 85.778 71.158, 95.851 66.840, 101.040 71.537 C 102.923 73.240, 103 73.233, 103 71.367 C 103 70.298, 101.987 67.416, 100.750 64.962 C 99.106 61.702, 97.298 59.894, 94.038 58.250 C 88.655 55.535, 84.820 55.438, 79.500 57.881 M 28.383 74.583 C 25.796 75.859, 23 79.506, 23 81.602 C 23 82.604, 33.584 86.835, 37.750 87.499 C 40.087 87.871, 42 88.637, 42 89.201 C 42 90.597, 33.838 89.310, 27.561 86.925 C 24.843 85.892, 22.425 85.242, 22.188 85.479 C 21.951 85.716, 22.070 89.259, 22.454 93.352 C 22.998 99.155, 23.636 101.249, 25.354 102.863 C 28.046 105.392, 34.416 107.721, 41.045 108.600 L 46 109.258 46 97.445 C 46 82.818, 44.308 78.296, 37.624 75.060 C 32.576 72.616, 32.390 72.607, 28.383 74.583 M 91 74.837 C 89.075 75.866, 86.495 78.461, 85.266 80.604 C 83.289 84.053, 83.031 85.917, 83.016 96.844 L 83 109.188 88.250 108.488 C 94.889 107.603, 102.648 104.340, 104.542 101.636 C 105.495 100.276, 106 97.034, 106 92.277 C 106 88.275, 105.832 85, 105.627 85 C 105.422 85, 103.285 85.870, 100.877 86.934 C 95.661 89.239, 86 90.738, 86 89.242 C 86 88.684, 88.138 87.918, 90.750 87.541 C 93.362 87.164, 97.831 85.802, 100.679 84.515 C 106.386 81.937, 106.839 80.031, 102.656 76.194 C 99.349 73.160, 95.068 72.662, 91 74.837"
        stroke="none"
        fill={fill}
        fillRule="evenodd"
      />
      <path d="" stroke="none" fill="#fcfcfc" fillRule="evenodd" />
    </svg>
  )
}

export const rallyIconString = (fill: string) => {
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
<g id="icomoon-ignore">
</g>
<path fill="${fill}" d="M343.293 274.636l2.339 146.567 23.461 6.262c23.265 6.219 23.461 5.913 23.461-35.647v-41.925h298.612v-221.827h-350.204l2.328 146.567zM267.998 460c-41.611 18.899-70.832 56.855-77.749 100.974-4.82 30.8-4.377 31.533 11.195 18.445 25.236-21.219 42.172-24.46 77.239-14.777 42.129 11.63 92.435 62.435 104.36 105.394 5.18 18.66 9.436 75.209 9.463 125.649 0.059 102.185-0.607 101.323 57.701 74.857 45.585-20.69 53.265-40.228 53.265-135.477 0-136.755-40.655-236.714-110.692-272.122-45.918-23.225-78.434-23.982-124.779-2.943zM644.244 459.793c-18.77 8.617-40.663 23.037-48.657 32.038-61.906 69.712-93.866 284.509-52.258 351.16 11.869 19.001 32.43 30.142 75.695 40.996l20.953 5.263v-101.503c0-88.431 2.473-106.331 19.197-139.067 38.633-75.609 124.572-112.448 168.844-72.376 16.066 14.53 16.721 14.471 16.721-1.45 0-9.122-8.644-33.708-19.197-54.645-14.025-27.814-29.452-43.238-57.266-57.266-45.926-23.163-78.646-23.99-124.035-3.147zM208.122 602.292c-22.073 10.886-45.926 42.003-45.926 59.884 0 8.55 90.3 44.648 125.845 50.311 19.938 3.174 36.259 9.71 36.259 14.522 0 11.909-69.637 0.929-123.192-19.417-23.19-8.813-43.818-14.358-45.84-12.336s-1.007 32.25 2.269 67.172c4.64 49.511 10.086 67.376 24.742 81.146 22.967 21.576 77.314 41.447 133.874 48.947l42.274 5.615v-100.786c0-124.795-14.436-163.377-71.463-190.984-43.069-20.851-44.656-20.929-78.842-4.071zM742.358 604.459c-16.423 8.778-38.437 30.918-48.92 49.202-16.866 29.425-19.068 45.33-19.197 138.557l-0.137 105.316 44.793-5.972c56.643-7.551 122.84-35.389 139-58.461 8.131-11.603 12.438-39.264 12.438-79.849 0-34.143-1.434-62.086-3.182-62.086s-19.981 7.422-40.526 16.501c-44.503 19.667-126.927 32.454-126.927 19.691 0-4.761 18.241-11.297 40.526-14.514s60.413-14.836 84.712-25.816c48.692-21.995 52.556-38.257 16.866-70.993-28.214-25.886-64.739-30.134-99.446-11.579z"></path>
</svg>`
}
