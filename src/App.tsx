import { useState } from 'react';
import PageCrafter from './pageCrafter'
import { ISchema } from './pageCrafter/shared/interfaces';

function App() {
	// state
	const [data, setData] = useState({
		name: 'Sumit Man',
		price: 8,
		quantity: 20
	});

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
		}
	};
	
	// schema layout
	const [schema] = useState<ISchema[]>([
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
								value: '{data.name}',
							},
							events: {
								onChange: '{events.handleNameChange}'
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
						'You have entered your name as {data.name}.',
						' It has {data.name.length} characters.',
						' Notice this also reflects in the section below which is outside the control of the PC'
					]
				},
				{
					type: 'button',
					events: {
						onClick: '{events.sayHello}'
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
						value: '{data.price}',
					},
					events: {
						onChange: '{events.handlePriceChange}'
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
						value: '{data.quantity}',
					},
					events: {
						onChange: '{events.handleQuantityChange}'
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
						'{data.price} * {data.quantity} * 1.18 = {(data.price * data.quantity * 1.18).toFixed(2)}'
					]
				}
			]
		}
	]);

	return (
		<>
			<PageCrafter data={data} events={events} schema={schema} />
			<div>
				<h1>This section is rendered outside the page crafter</h1>
				<label htmlFor="altName" className="block">This input is outside PC and still reactive</label>
				<input id="altName" value={data.name} onChange={handleNameChange} />
				<p className="mt-0">Value: {data.name}. You may try to change this to see the effect in PC</p>
			</div>
		</>
	);
}

export default App;
