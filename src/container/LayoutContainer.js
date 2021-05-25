import {connect} from 'react-redux';

import Layout from '../components/Layout';

const mapStateToProps = ({ AppState }) => ({
  items: AppState.items,
  categories: AppState.categories,
  product: AppState.product,
});
  
const mapDispatchToProps = ({ 
    AppState: { 
      fetchItems,
    } 
  }) => ({
    fetchItems: (queryData) => fetchItems(queryData)
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
