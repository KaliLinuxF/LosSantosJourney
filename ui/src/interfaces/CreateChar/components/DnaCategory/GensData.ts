type ImagesType = {
	[key: string]: string
}
type GenType = {
	name: string
	imageUrl: any
}

const Images: ImagesType = {}
// @ts-ignore
const r = require.context('../../assets/images/gens/', false, /.png$/)
// @ts-ignore
r.keys().map(item => { Images[item.replace('./', '')] = r(item); });

export const GensData: GenType[] = [
	{ name: 'Benjamin', imageUrl: Images[`0.png`] },
	{ name: 'Daniel', imageUrl: Images[`1.png`] },
	{ name: 'Joshua', imageUrl: Images[`2.png`] },
	{ name: 'Noah', imageUrl: Images[`3.png`] },
	{ name: 'Andrew', imageUrl: Images[`4.png`] },
	{ name: 'Juan', imageUrl: Images[`5.png`] },
	{ name: 'Alex', imageUrl: Images[`6.png`] },
	{ name: 'Isaac', imageUrl: Images[`7.png`] },
	{ name: 'Evan', imageUrl: Images[`8.png`] },
	{ name: 'Ethan', imageUrl: Images[`9.png`] },
	{ name: 'Vincent', imageUrl: Images[`10.png`] },
	{ name: 'Angel', imageUrl: Images[`11.png`] },
	{ name: 'Diego', imageUrl: Images[`12.png`] },
	{ name: 'Adrian', imageUrl: Images[`13.png`] },
	{ name: 'Gabriel', imageUrl: Images[`14.png`] },
	{ name: 'Michael', imageUrl: Images[`15.png`] },
	{ name: 'Santiago', imageUrl: Images[`16.png`] },
	{ name: 'Kevin', imageUrl: Images[`17.png`] },
	{ name: 'Louis', imageUrl: Images[`18.png`] },
	{ name: 'Samuel', imageUrl: Images[`19.png`] },
	{ name: 'Anthony', imageUrl: Images[`20.png`] },
	{ name: 'Hannah', imageUrl: Images[`21.png`] },
	{ name: 'Audrey', imageUrl: Images[`22.png`] },
	{ name: 'Jasmine', imageUrl: Images[`23.png`] },
	{ name: 'Giselle', imageUrl: Images[`24.png`] },
	{ name: 'Amelia', imageUrl: Images[`25.png`] },
	{ name: 'Isabella', imageUrl: Images[`26.png`] },
	{ name: 'Zoe', imageUrl: Images[`27.png`] },
	{ name: 'Ava', imageUrl: Images[`28.png`] },
	{ name: 'Camila', imageUrl: Images[`29.png`] },
	{ name: 'Violet', imageUrl: Images[`30.png`] },
	{ name: 'Sophia', imageUrl: Images[`32.png`] },
	{ name: 'Eveleyn', imageUrl: Images[`32.png`] },
	{ name: 'Nicole', imageUrl: Images[`33.png`] },
	{ name: 'Ashley', imageUrl: Images[`34.png`] },
	{ name: 'Grace', imageUrl: Images[`35.png`] },
	{ name: 'Brianna', imageUrl: Images[`36.png`] },
	{ name: 'Natalie', imageUrl: Images[`37.png`] },
	{ name: 'Olivia', imageUrl: Images[`38.png`] },
	{ name: 'Elizabeth', imageUrl: Images[`39.png`] },
	{ name: 'Charlo', imageUrl: Images[`40.png`] },
	{ name: 'Emma', imageUrl: Images[`41.png`] },
	{ name: 'George', imageUrl: Images[`42.png`] },
	{ name: 'Niko', imageUrl: Images[`43.png`] },
	{ name: 'John', imageUrl: Images[`44.png`] },
	{ name: 'Misty', imageUrl: Images[`45.png`] },
]
