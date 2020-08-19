import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiscStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implamentations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implamentations/HandlebarsMailTemplateProvider';



container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
)


container.registerInstance<IMailTemplateProvider>(
    'MailTemplateProvider',
    new HandlebarsMailTemplateProvider(),
)

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
)