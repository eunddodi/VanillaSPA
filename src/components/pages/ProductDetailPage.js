import CCApi from '../../api/index.js';
import { Component } from '../../core/Component.js';
import ProductOrderer from '../ProductOrderer.js';
import { $ } from '../../utils/dom.js';
import { calculateTotalPrice } from '../../utils/index.js';
import localStorage from '../../utils/localStorage.js';
import router from '../../core/router.js';
import { LOCAL_STORAGE_KEY_CART } from '../../core/constants.js';

class ProductDetailPage extends Component {
	setup() {
		this.state = {
			productCart: [],
			productData: null,
			totalPrice: 0,
		};
	}

	async mounted() {
		const { productId } = router.useParams();
		const res = await CCApi.getProductDetail(productId);
		this.setState({ ...this.state, productData: res });
	}

	updated() {
		if (this.state.productData != null) {
			ProductOrderer.mount($('.ProductDetail__selectedOptions'), {
				data: this.state.productCart,
				totalPrice: this.state.totalPrice,
				orderProduct: this.orderProduct.bind(this),
				handleProductQuantityUpdate:
					this.handleProductQuantityUpdate.bind(this),
			});
		}
	}

	template() {
		if (this.state.productData != null) {
			const { name, price, imageUrl, productOptions } = this.state.productData;
			return `
			<div class="ProductDetailPage">
					<h1>${name} 상품 정보</h1>
					<div class="ProductDetail">
						<img
							src=${imageUrl}
						/>
						<div class="ProductDetail__info">
							<h2>${name}</h2>
							<div class="ProductDetail__price">${price}~</div>
							<select>
								<option>선택하세요.</option>
								${productOptions.map((option) => {
									if (option.stock === 0) {
										return `<option value="${option.id}" disabled >(품절) ${name} ${option.name}</option>`;
									} else if (option.price > 0) {
										return `<option value="${option.id}">${name} ${option.name} (+${option.price}원)</option>`;
									} else {
										return `<option value="${option.id}">${name} ${option.name}</option>`;
									}
								})}
							</select>
							<div class="ProductDetail__selectedOptions">
							</div>
						</div>
					</div>
				</div>`;
		}
	}

	findClickedOptionData(selectedOptionId) {
		return this.state.productData.productOptions.find(
			(item) => item.id === Number(selectedOptionId),
		);
	}

	orderProduct(e) {
		e.stopPropagation();
		const { productData, productCart } = this.state;
		const formattedData = productCart.map((item) => {
			item.productId = productData.id;
			return item;
		});
		localStorage.setWithExistingData(LOCAL_STORAGE_KEY_CART, formattedData);
		router.push('/cart');
	}

	handleProductQuantityUpdate(e) {
		e.stopPropagation();
		const selectedOptionId = e.target.id;
		const updatedQuantity = Number(e.target.value);

		const updatedProductCart = this.state.productCart.map((item) => {
			if (item.optionId === Number(selectedOptionId)) {
				if (item.optionData.stock < updatedQuantity) {
					alert('올바른 수량을 입력하세요.');
					return {
						...item,
						quantity: item.optionData.stock,
					};
				} else {
					return {
						...item,
						quantity: updatedQuantity,
					};
				}
			}
			return item;
		});

		const updatedTotalPrice = calculateTotalPrice(updatedProductCart);
		this.setState({
			...this.state,
			productCart: updatedProductCart,
			totalPrice: updatedTotalPrice,
		});
	}

	handleProductClick(e) {
		const selectedOptionId = e.target.value;
		if (parseInt(selectedOptionId) == NaN) {
			return;
		}

		const isAlreadyExist = this.state.productCart.find(
			(item) => item.optionId === Number(selectedOptionId),
		);
		if (isAlreadyExist) {
			return;
		}
		const clickedOptionData = this.findClickedOptionData(selectedOptionId);

		const updatedProductCart = [
			...this.state.productCart,
			{
				optionId: Number(selectedOptionId),
				optionData: {
					...clickedOptionData,
					price: this.state.productData.price + clickedOptionData.price,
				},
				quantity: 1,
			},
		];

		const updatedTotalPrice = calculateTotalPrice(updatedProductCart);

		this.setState({
			...this.state,
			productCart: updatedProductCart,
			totalPrice: updatedTotalPrice,
		});
	}

	setEvent() {
		this.addEvent(
			'change',
			'.ProductDetailPage',
			this.handleProductClick.bind(this),
		);
	}
}

export default new ProductDetailPage();
