import fs from 'fs';
import tmp from 'tmp';

export default function(toolName, content, postfix = '.json') {
  const file = tmp.fileSync({
    prefix: `knuckle-${toolName}-`,
    postfix,
  });

  fs.writeFileSync(file.fd, content, 'utf-8');

  return file.name;
}
