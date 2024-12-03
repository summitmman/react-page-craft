import { useState, lazy } from 'react';
import PageCrafter from './pageCrafter'
import { IPage, UseStateObj } from './pageCrafter/shared/interfaces';

const Button = lazy(() => import('./components/Button'));

interface IMyData extends Record<string, any> {
	name: string;
	price: number;
	quantity: number;
}

function App() {
	// state
	const dataObj: UseStateObj<IMyData> = useState<IMyData>({
		name: 'Sumit Man',
		price: 8,
		quantity: 20
	});
	const [data, setData] = dataObj;

	// event handlers
	const sayHello = () => {
		alert(`The name you have entered is ${data.name}`);
	};
	const handleNameChange = (e: any) => {
		setData({
			...data,
			name: e.target.value
		});
	};
	const events = {
		sayHello,
		handleNameChange,
		handlePriceChange: (e: any) => {
			setData({
				...data,
				price: e.target.value ? parseInt(e.target.value) : 0
			});
		},
		handleQuantityChange: (e: any) => {
			setData({
				...data,
				quantity: e.target.value ? parseInt(e.target.value) : 0
			});
		},
		handleCountryChange: (e: any) => {
			setData({
				...data,
				country: e.target.value ?? ''
			});
		},
	};
	
	// schema layout
	const [page] = useState<IPage>({
		id: 'sample-page',
		data: {
			country: 'Sweden'
		},
		schema: [
			{
				type: 'h1',
				children: ['This section is rendered by the page crafter']
			},
			{
				type: 'div',
				children: [
					{
						type: 'h2',
						props: { className: 'mb-3' },
						children: ['Form input demo']
					},
					{
						type: 'div',
						children: [
							{
								type: 'label',
								props: {
									htmlFor: 'name',
									className: 'block'
								},
								children: ['Please enter your name']
							},
							{
								type: 'input',
								id: 'name',
								props: {
									value: '{name}',
								},
								events: {
									onChange: '{handleNameChange}'
								}
							}
						]
					},
					{
						type: 'p',
						props: {
							className: 'mt-0'
						},
						children: [
							'You have entered your name as {name}.',
							' It has {name.length} characters.',
							' Notice this also reflects in the section below which is outside the control of the PC'
						]
					},
					{
						type: 'button',
						events: {
							onClick: '{sayHello}'
						},
						children: ['Submit Name']
					}
				]
			},
			{
				type: 'div',
				children: [
					{
						type: 'h2',
						props: { className: 'mb-3' },
						children: ['Template calculation demo']
					},
					{
						type: 'label',
						props: {
							htmlFor: 'price',
							className: 'block'
						},
						children: ['Price']
					},
					{
						type: 'input',
						id: 'price',
						props: {
							type: 'number',
							value: '{price}',
						},
						events: {
							onChange: '{handlePriceChange}'
						}
					},
					{
						type: 'label',
						props: {
							htmlFor: 'quantity',
							className: 'block'
						},
						children: ['Quantity']
					},
					{
						type: 'input',
						id: 'quantity',
						props: {
							type: 'number',
							value: '{quantity}',
						},
						events: {
							onChange: '{handleQuantityChange}'
						}
					},
					{
						type: 'div',
						props: {
							className: 'mt-3'
						},
						children: [
							{
								type: 'b',
								children: ['Formula: ']
							},
							'Price * Quantity * 1.18'
						]
					},
					{
						type: 'div',
						children: [
							{
								type: 'b',
								children: ['Calculation: ']
							},
							'{price} * {quantity} * 1.18 = {toFixed(price * quantity * 1.18, 2)}'
						]
					}
				]
			},
			{
				type: 'div',
				children: [
					{
						type: 'input',
						id: 'country',
						props: {
							type: 'text',
							value: '{country}',
							className: 'mt-3'
						},
						events: {
							onChange: '{handleCountryChange}'
						}
					},
					{
						type: 'div',
						children: [
							'{country}'
						]
					},
					{
						type: 'Button',
						children: [
							'Custom Button'
						],
						events: {
							onClick: '{sayHello}'
						},
						props: {
							className: 'mt-3'
						}
					}
				]
			}
		]
	});
	
	const syncState = (state: Record<string, any>) => {
		setData({
			...data,
			...state
		});
	};

	const [components] = useState({
		Button: Button
	});

	return (
		<>
			<PageCrafter dataObj={dataObj as UseStateObj<any>} events={events} page={page} syncState={syncState} components={components} />
			<div>
				<h1>This section is rendered outside the page crafter</h1>
				<label htmlFor="altName" className="block">This input is outside PC and still reactive</label>
				<input id="altName" value={data.name} onChange={handleNameChange} />
				<p className="mt-0">Value: {data.name}. You may try to change this to see the effect in PC</p>
				{/* <Button onClick={sayHello}>Custom button</Button> */}
			</div>
		</>
	);
}

export default App;
