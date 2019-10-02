FROM grafana/grafana:6.4.1@sha256:b6693ae3dce4600aef6e43bdd7c075135c0eef48cc0231d3558fe4acb64ecb26

LABEL org.opencontainers.image.url=https://sourcegraph.com/
LABEL org.opencontainers.image.source=https://github.com/sourcegraph/sourcegraph/
LABEL org.opencontainers.image.documentation=https://docs.sourcegraph.com/
LABEL com.sourcegraph.grafana.version=6.3.3

# hadolint ignore=DL3020
ADD --chown=grafana:grafana config /sg_config_grafana

# hadolint ignore=DL3020
ADD --chown=grafana:grafana entry.sh /

USER grafana
ENTRYPOINT ["/entry.sh"]
