const fs = require("fs");
const path = require("path");

class InheritancePlugin {
  constructor(options) {
    this.name = options.name || "InheritancePlugin";
    this.parentTheme = options.parent || "default";
    this.fileExtensions = options.fileExtensions || [".js", ".json", ".ts", ".vue", ".graphql"];
  }

  apply(resolver) {
    const themePath = path.resolve(__dirname);
    const parentThemePath = path.resolve(__dirname, "..", this.parentTheme);
    
    const target = resolver.ensureHook("existing-file");
    resolver
      .getHook("raw-file")
      .tapAsync(this.name, (request, resolveContext, callback) => {
        const currentPath = request.path;

        if (this.fileExists(currentPath)) {
          return callback();
        }

        let newPath = this.resolveFile(currentPath.replace(themePath, parentThemePath));

        if (!this.fileExists(newPath)) {
          return callback();
        }

        const newResolverObject = {
          ...request,
          path: newPath,
          request: undefined,
        };

        return resolver.doResolve(
          target,
          newResolverObject,
          `resolved by ${this.name} to ${newPath}`,
          resolveContext,
          callback
        );
      });
  }

  fileExists(path) {
    if (fs.existsSync(path)) {
      return true;
    }

    let fileExists = false;
    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + fileExtension)) {
        return (fileExists = true);
      }
    });

    return fileExists;
  }

  resolveFile(path) {
    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + fileExtension)) {
        path = path + fileExtension;
        return;
      }
    });

    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + "/index" + fileExtension)) {
        path = path + "/index" + fileExtension;
        return;
      }
    });

    return path;
  }
}

module.exports = InheritancePlugin;
