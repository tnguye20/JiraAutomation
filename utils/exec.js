const util = require('util');
const _exec = util.promisify(require('child_process').exec);

module.exports.exec = async ({
  cmd,
  options={
    cwd: "."
  },
}) => {
  try {
    const { stdout, stderr } = await _exec(cmd, options);
    if(stderr.length > 0) throw new Error(stderr);
    return {
      status: 0,
      stdout: stdout.replace("\n", ""),
      stderr
    };
  } catch (err) {
    if ( !options.suppress ){
      console.log(err);
    }
    const { code, stderr, cmd, stdout } = err;
    return { code, stderr, cmd, stdout, status: code };
  }
}
