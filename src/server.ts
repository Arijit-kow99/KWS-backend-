import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CommoditysRoute from './routes/commoditys.route';
import CustomerRoute from './routes/customer.router';
import AddressRoute from './routes/addresses.route';
import ProductsRoute from './routes/product.route';
import CommodityTypeRoute from './routes/commodity_types.route';
import DomainRoute from './routes/domain.route';
import OrderRoute from './routes/order.route';

validateEnv();

const app = new App([new IndexRoute(), new CommoditysRoute(), 
    new UsersRoute(), new AuthRoute(), 
    new CustomerRoute()
    ,new ProductsRoute,new AddressRoute(), new CommodityTypeRoute(), new DomainRoute(),
    new OrderRoute()]);

app.listen();
