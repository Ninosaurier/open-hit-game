import { ApiConfiguration } from './api/api-configuration';

export function createApiConfiguration(): ApiConfiguration {
  const config = new ApiConfiguration();
  config.rootUrl = '';  
  return config;
}