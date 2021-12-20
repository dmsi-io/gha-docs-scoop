import { exec, ExecException } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const getContents = (fileName: string, title: string) => {
  const contents = readFileSync(fileName).toString();
  return contents.startsWith("---")
    ? contents
    : `---\ntitle: ${title}\n---\n\n${contents}\n\n{{< packages >}}`;
};

export default (packageName: string) => {
  exec(`rm docs-hugo/content/packages/${packageName}/**/*.md`);
  exec(
    "git ls-files",
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      stdout
        .split("\n")
        .map(fileName => fileName.trim())
        // Only include markdown files in src dirs (or are changelogs) to prevent copying licenses
        .filter(fileName => fileName.endsWith(".md"))
        .forEach(fileName => {
          // The name of the file without the path
          const fileNameSansPath = fileName.replace(/.+\/(.+?\.md)/, "$1");

          // Modify the path to the input file into the output dir
          let outputDir = `docs-hugo/content/packages/${packageName}/${fileName.replace(
            /(?:package|private|public|tools)\/|[^\/]+\.md|\/src/g,
            ""
          )}`;
          if (outputDir.endsWith("/"))
            outputDir = outputDir.slice(0, outputDir.length - 1);
          console.log(`outputDir: ${outputDir}`);
          const paths = outputDir
            // Get all possible directories that may need to be created
            .split("/")
            // Remove trailing path separators
            .map(fName => fName.replace("/", ""))
            // Remove blank strings
            .filter(fName => fName && fName.trim().length > 0);

          paths.forEach((newFile, i) => {
            // Get the full path for the new dir
            const recursivePath = paths.slice(0, i + 1).join("/");
            if (!existsSync(recursivePath)) {
              // Create a dir if it doesn't exist
              mkdirSync(recursivePath);

              // Populate the new dir with an index file (will be overwritten if one has been written by the dev).
              const titleCasedDir = `${newFile
                .charAt(0)
                .toUpperCase()}${newFile.slice(1)}`;
              writeFileSync(
                `${recursivePath}/_index.md`,
                `---\ntitle: ${titleCasedDir}\n---\n`
              );
            }
          });

          if (
            fileNameSansPath.toLowerCase() === "readme.md" ||
            outputDir.endsWith(fileNameSansPath.split(".")[0])
          ) {
            let title = paths[paths.length - 1];
            title = `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
            writeFileSync(
              `${outputDir}/_index.md`,
              getContents(fileName, title)
            );
          } else {
            writeFileSync(
              `${outputDir}/${fileNameSansPath}`,
              getContents(fileName, fileNameSansPath.replace(".md", ""))
            );
          }
        });
    }
  );
};
