import React, {useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';

class LayoutChildrenComponents extends React.Component{
  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {

      if (React.isValidElement(child)) {
        return React.cloneElement(child, {...this.props});
      }
      return child;
    });

    return <div>{childrenWithProps}</div>;
  }
}

function Layout(props) {
  const {fetchItems} = props;
  const {search, pathname} = useLocation();
  const values = queryString.parse(search);
  const queryValue = values.search;

  const getFetchItems = useCallback((data) => {
    fetchItems(data);
  }, [fetchItems]);

  useEffect(() => {
    const queryData = {'searchValue': queryValue, pathname};

    getFetchItems(queryData);
  }, [getFetchItems, pathname, queryValue]);

  return (
    React.cloneElement(<LayoutChildrenComponents />, {...props})
  )
}

export default Layout;