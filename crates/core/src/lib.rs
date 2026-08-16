//! PomoFlow 域核心 crate
//!
//! 这是新一代桌面端 / 云端共用的"业务大脑"。**不含任何 UI、I/O、平台代码**——
//! 只放域模型、同步协议、抽象存储接口,保证它能:
//!
//! - 被 Tauri desktop 后端使用(P1)
//! - 被未来云端 Sync Service 使用(P2+)
//! - 在 Rust 单测里被独立驱动验证(P0)
//!
//! ## 模块地图
//!
//! - [`model`]     —— 领域实体(Task / Project / Tag / PomodoroSession / Review ...)
//! - [`sync`]      —— 同步协议(ChangeLog + LWW 合并算法 + revision)
//! - [`store`]     —— 存储抽象(`Store` trait + 内存实现,供测试 / 后续 SQLite 实现)
//! - [`validate`]  —— 业务规则校验(任务必填项、项目层级 ≤ 3 ...)
//! - [`stats`]     —— 统计聚合(趋势 / 总览 / 项目分布,v1 crud.py 翻译)
//! - [`error`]     —— 统一错误类型

#![deny(rust_2018_idioms)]
#![warn(missing_debug_implementations)]
#![warn(unreachable_pub)]

pub mod error;
pub mod model;
pub mod stats;
pub mod store;
pub mod sync;
pub mod validate;

pub use error::{CoreError, CoreResult};
pub use model::Id;
