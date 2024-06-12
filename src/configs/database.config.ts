import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [join(__dirname, '../entities/**/*.entity{.ts,.js}')],
    synchronize: true,
    autoLoadEntities: false
}