export abstract class AbstractDeleteProjectService {
	abstract execute(id: string): Promise<void>
}
