import { SetMetadata } from '@nestjs/common';

// 不需要验证token
export const Public = () => SetMetadata('noValidate', true);
