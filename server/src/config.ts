import { IsEnum, IsNumber, IsOptional } from 'class-validator';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  PROVISION = 'provision',
}

export class Config {
  @IsEnum(Environment)
  @IsOptional()
  public readonly env: Environment = Environment.DEVELOPMENT;

  @IsNumber()
  @IsOptional()
  public readonly port: number = 4000;
}
