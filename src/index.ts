import copyDocs from "./scoop";

if (require.main === module) {
  const packageName = process.argv[2];
  if (packageName) {
    copyDocs(packageName);
  } else {
    console.error(
      `Include the name of the package as an argument to this script in the form of:\n${process.execPath} ${process.argv[1]} packageName`
    );
    process.exit(1);
  }
}
