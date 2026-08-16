//! `migrate-v1` 二进制入口。
//!
//! 真正的业务逻辑全在 `lib.rs`(库),本文件只是 `pub fn main` 调一下 `clap`
//! 解析后转交 `migrate_v1::run_main_with_args`。这种"bin + lib"双 target
//! 拆分让 `tests/integ.rs` 能 `use migrate_v1::...` 直接复用迁移逻辑。

use std::process::ExitCode;

use clap::Parser;

use migrate_v1::{run_main_with_args, Args};

fn main() -> ExitCode {
    let args = Args::parse();
    match run_main_with_args(args) {
        Ok(()) => ExitCode::SUCCESS,
        Err(e) => {
            eprintln!("migrate-v1 failed: {e:?}");
            ExitCode::FAILURE
        }
    }
}
