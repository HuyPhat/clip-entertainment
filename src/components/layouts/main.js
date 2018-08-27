import LayoutsHeader from '@components/layouts/header';
import LayoutsFooter from '@components/layouts/footer';
import HeadCustom from '@components/layouts/head';

export default ({ children, title = 'This is the default title' }) => (
    <div>
        <HeadCustom />
        <LayoutsHeader />
        {children}
        <LayoutsFooter />
    </div>
)