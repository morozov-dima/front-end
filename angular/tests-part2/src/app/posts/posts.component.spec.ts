import { PostsComponent } from "./posts.component";
import { PostsService } from "./posts.service";

describe('PostsComponent', () => {
  let component: PostsComponent
  let service: PostsService

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ["http"]);
    service = new PostsService(spy);
    component = new PostsComponent(service);
  });

})
