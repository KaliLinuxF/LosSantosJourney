export type BodyType = {
    ageing: { value: number, saturation: number } // 0..14
	blemishes: { value: number, saturation: number } // 0..23
	bodyBlemishes: { value: number, saturation: number } // 0..11
	sunDamage: { value: number, saturation: number } // 0..10
	moles: { value: number, saturation: number } // 0..17
}