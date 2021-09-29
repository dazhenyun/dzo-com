import './fonts/iconfont';
import './index.less';

export default ({ type, prefix = 'dzo-', className = '', ...props }) => {
  return (
    <i className={`dzo-icon ${className}`} type={type} {...props}>
      <svg aria-hidden="true">
        <use xlinkHref={`#${prefix}${type}`} />
      </svg>
    </i>
  );
};
