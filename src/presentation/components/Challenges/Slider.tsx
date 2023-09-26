import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface SliderProps {
	children: React.ReactNode
}

export const Slider: React.FC<SliderProps> = ({ children }) => {
	return (
		<Swiper
			className='h-[450px]'
			slidesPerView={'auto'}
			spaceBetween={30}
			grabCursor={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false
			}}
			modules={[Autoplay]}
			breakpoints={{
				320: { slidesPerView: 1 },
				640: { slidesPerView: 2 },
				768: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
				1280: { slidesPerView: 3 },
				1440: { slidesPerView: 4 }
			}}>
			{React.Children.map(children, (child) => (
				<SwiperSlide>{child}</SwiperSlide>
			))}
		</Swiper>
	)
}
